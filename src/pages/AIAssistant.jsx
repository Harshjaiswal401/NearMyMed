import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Plus,
  Bot,
  User,
  MessageSquare,
  Copy,
  Check,
  Wifi,
  WifiOff,
} from "lucide-react";

// ── n8n webhook configuration ──────────────────────────────────────────────
const N8N_WEBHOOK_URL =
  "https://harshg789.app.n8n.cloud/webhook/d6404487-3e08-4921-b58e-aa4cac78df21/chat";
const SESSION_ID = "user-12345";

async function sendToN8N(userMessage) {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "sendMessage",
      sessionId: SESSION_ID,
      chatInput: userMessage,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook error: ${response.status}`);
  }

  const data = await response.json();

  // n8n may return the reply in various shapes — handle common patterns
  return (
    data?.output ||
    data?.text ||
    data?.message ||
    data?.reply ||
    data?.response ||
    (typeof data === "string" ? data : null) ||
    "I received your message but couldn't parse the response. Please try again."
  );
}

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState(["New Chat"]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [webhookError, setWebhookError] = useState(false);

  const messagesEndRef = useRef(null);

  const suggestions = [
    "Can I take Dolo 650 after food?",
    "Explain my prescription",
    "Side effects of Azithromycin",
    "Find alternative medicine",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (messageText) => {
    const userMessage = (messageText ?? input).trim();
    if (!userMessage || loading) return;

    // Append user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Track in sidebar history
    if (history.length === 1) {
      setHistory((prev) => [userMessage.slice(0, 30), ...prev]);
    }

    setInput("");
    setLoading(true);
    setWebhookError(false);

    try {
      const reply = await sendToN8N(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("n8n webhook error:", err);
      setWebhookError(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Unable to reach the AI service right now. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setMessages([]);
    setInput("");
    setWebhookError(false);
  };

  const copyMessage = async (text, index) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-9rem)] flex bg-[#f7f7f8]">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex w-72 bg-white/90 backdrop-blur-md border-r border-gray-200 flex-col">
        <div className="p-4">
          <button
            onClick={newChat}
            className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        <div className="px-3 pb-3 flex-1 overflow-y-auto">
          <h3 className="text-xs text-gray-400 uppercase mb-3 px-1">Recent Chats</h3>
          {history.map((item, index) => (
            <button
              key={index}
              className="w-full text-left p-3 rounded-xl hover:bg-gray-100 flex items-center gap-2 mb-1 transition"
            >
              <MessageSquare size={15} className="text-gray-400 shrink-0" />
              <span className="truncate text-sm text-gray-700">{item}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 text-white w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              <User size={16} />
            </div>
            <div>
              <p className="font-medium text-sm">NearMyMed User</p>
              <p className="text-xs text-gray-500">Medical Assistant</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Chat Area ────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-xl shadow">
              <Bot size={18} />
            </div>
            <div>
              <h2 className="font-semibold text-sm">NearMyMed AI</h2>
              <p className="text-xs text-green-600 flex items-center gap-1">
                {webhookError ? (
                  <>
                    <WifiOff size={10} className="text-red-400" />
                    <span className="text-red-400">Service unavailable</span>
                  </>
                ) : (
                  <>
                    <Wifi size={10} />
                    Powered by NearMyMed AI
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Mobile: new chat button */}
          <button
            onClick={newChat}
            className="md:hidden flex items-center gap-1.5 text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg"
          >
            <Plus size={14} /> New Chat
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && !loading ? (
            /* Welcome Screen */
            <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Bot size={40} className="text-white" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-center">
                Welcome to NearMyMed AI
              </h1>

              <p className="text-gray-500 mt-3 text-center max-w-xl">
                Get medicine information, understand prescriptions, learn about
                side effects and get healthcare guidance.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-10 max-w-3xl w-full">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => sendMessage(item)}
                    className="bg-white border border-gray-200 rounded-3xl p-5 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-green-500 transition-all duration-300"
                  >
                    <p className="font-semibold text-gray-800">{item}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Click to ask NearMyMed AI
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message Thread */
            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-3xl ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "user"
                          ? "bg-green-500 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>

                    <div>
                      {/* Bubble */}
                      <div
                        className={`px-5 py-3 rounded-2xl shadow-sm prose prose-sm max-w-none ${
                          msg.role === "user"
                            ? "bg-green-500 text-white prose-invert"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>

                      {/* Copy button for AI messages */}
                      {msg.role === "assistant" && (
                        <button
                          onClick={() => copyMessage(msg.content, index)}
                          className="mt-2 text-xs flex items-center gap-1 text-gray-500 hover:text-green-600 transition"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check size={14} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white border border-gray-200 px-5 py-3.5 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-xs text-gray-400 font-medium">Typing…</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-5 bg-[#f7f7f8] shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl flex items-center px-4 sm:px-5 py-3 shadow-lg focus-within:ring-2 focus-within:ring-green-500 transition">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask anything about medicines..."
                className="flex-1 outline-none bg-transparent text-sm"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 text-white p-2.5 rounded-xl transition-all duration-200 shadow-md ml-2 shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2.5">
              AI can make mistakes. Always verify important medical information with a doctor.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}