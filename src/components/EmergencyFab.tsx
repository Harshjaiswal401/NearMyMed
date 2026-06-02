import { useTheme } from '../context/ThemeContext';
import modiLogo from "./modi.jpg";

export default function EmergencyFab() {
  const { isDark } = useTheme();

  return (
    <a
      href="https://www.janaushadhi.gov.in/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[9999] bottom-[140px] right-[28px]
      w-[88px] h-[88px]
      sm:bottom-[110px] sm:right-[20px]
      sm:w-[76px] sm:h-[76px]
      flex items-center justify-center
      rounded-xl overflow-hidden cursor-pointer
      animate-bounce"
      style={{
        boxShadow: "0 0 25px rgba(0,30,255,.7), 0 0 30px rgba(0,30,255,0.5)"
      }}
    >
      <img
        src={modiLogo}
        alt="Jan Aushadhi"
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
      />
    </a>
  );
}