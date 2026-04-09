import { useState } from 'react';
import { Search, Pill, Star, TrendingUp, Filter } from 'lucide-react';
import { PageLayout, SearchBar, EmptyResultCard } from '../../components/Layout';

const medicines = [
  { name: 'Paracetamol 500mg', brand: 'Calpol', category: 'Analgesic', price: '₹12', rating: 4.8, trend: '12%', inStock: true, description: 'Pain reliever and fever reducer' },
  { name: 'Amoxicillin 250mg', brand: 'Amoxil', category: 'Antibiotic', price: '₹45', rating: 4.6, trend: '8%', inStock: true, description: 'Broad-spectrum antibiotic' },
  { name: 'Metformin 500mg', brand: 'Glucophage', category: 'Antidiabetic', price: '₹28', rating: 4.7, trend: '5%', inStock: true, description: 'Type 2 diabetes management' },
  { name: 'Atorvastatin 10mg', brand: 'Lipitor', category: 'Statin', price: '₹65', rating: 4.5, trend: '3%', inStock: false, description: 'Cholesterol management' },
  { name: 'Omeprazole 20mg', brand: 'Prilosec', category: 'PPI', price: '₹32', rating: 4.4, trend: '6%', inStock: true, description: 'Acid reflux and GERD treatment' },
  { name: 'Azithromycin 500mg', brand: 'Zithromax', category: 'Antibiotic', price: '₹120', rating: 4.6, trend: '15%', inStock: true, description: 'Z-Pack antibiotic for infections' },
];

export default function SearchByName() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(medicines);
  const [searched, setSearched] = useState(false);

  const handleSearch = (val: string) => {
    setQuery(val);
    setSearched(true);
    if (!val.trim()) { setResults(medicines); return; }
    setResults(medicines.filter(m =>
      m.name.toLowerCase().includes(val.toLowerCase()) ||
      m.brand.toLowerCase().includes(val.toLowerCase())
    ));
  };

  return (
    <PageLayout
      icon={<Search size={26} className="text-blue-400" />}
      title="Search Medicine by Name"
      subtitle="Find medicines by brand name or generic name. Get real-time stock info and pricing."
      badge="Search Engine"
      badgeColor="blue"
      accentColor="blue"
    >
      {/* Search */}
      <div className="mb-8">
        <SearchBar
          placeholder="Enter medicine name (e.g. Paracetamol, Calpol...)"
          onSearch={handleSearch}
          buttonLabel="Search"
          accent="blue"
        />
      </div>

      {/* Popular Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['Paracetamol', 'Omeprazole', 'Metformin', 'Azithromycin', 'Atorvastatin'].map((tag) => (
          <button
            key={tag}
            onClick={() => handleSearch(tag)}
            className="text-xs px-4 py-2 glass rounded-full border border-white/10 text-slate-400 hover:text-blue-300 hover:border-blue-500/30 transition"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">
            {searched ? `${results.length} Result${results.length !== 1 ? 's' : ''} Found` : 'All Medicines'}
          </h2>
          <button className="flex items-center gap-2 text-xs text-slate-400 glass border border-white/8 px-3 py-2 rounded-xl hover:text-white transition">
            <Filter size={13} /> Filter
          </button>
        </div>

        {results.length === 0 ? (
          <EmptyResultCard icon="🔍" text="No medicines found. Try a different name." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((med) => (
              <div
                key={med.name}
                className="glass rounded-2xl border border-white/8 p-6 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 hover:border-blue-500/25 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-2xl">
                    💊
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp size={10} /> {med.trend}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      med.inStock
                        ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                        : 'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>
                      {med.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-white group-hover:text-blue-300 transition text-sm mb-1">{med.name}</h3>
                <p className="text-xs text-slate-500">{med.brand} · {med.category}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{med.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <span className="text-blue-400 font-black">{med.price}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" /> {med.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
