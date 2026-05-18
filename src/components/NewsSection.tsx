export const NewsSection = () => (
  <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Market News</h3>
      <button className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors cursor-pointer">Latest Updates</button>
    </div>
    <div className="space-y-4">
      {[
        { title: "Fed Chair hints at potential rate cuts by late Q3", time: "12m ago", source: "Bloomberg" },
        { title: "NVIDIA surges as AI demand shows no signs of slowing", time: "45m ago", source: "Reuters" },
        { title: "Apple faces new antitrust probe in EU region", time: "2h ago", source: "TechCrunch" }
      ].map((news, i) => (
        <div key={i} className="flex gap-4 group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0">
          <div className="w-16 h-16 rounded-xl bg-white/5 flex-shrink-0 group-hover:bg-white/10 transition-colors overflow-hidden border border-white/5">
            <img 
              src={`https://picsum.photos/seed/${news.source + i}/200/200`} 
              alt="news" 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">{news.title}</h4>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-tight">{news.source}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-tight">{news.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
