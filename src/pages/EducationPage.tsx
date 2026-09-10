import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const education = [
  {
    school: 'Self-Taught Developer',
    field: 'Self-improvement',
    start: '2019',
    end: '2022',
    location: '',
  },
  {
    school: 'HTL Eisenstadt',
    field: 'Mechanical Engineering & Self-improvement in Programming',
    start: '2023',
    end: '2024',
    location: 'Eisenstadt, Austria',
  },
  {
    school: 'HTL Spengergasse Vienna',
    field: 'Network Engineering, Sysadmin, Programming',
    start: '2024',
    end: 'Present',
    location: 'Vienna, Austria',
  },
];

function duration(start: string, end: string) {
  const endYear = end === 'Present' ? new Date().getFullYear() : parseInt(end, 10);
  const yrs = endYear - parseInt(start, 10) + 1;
  return `${yrs} yr${yrs === 1 ? '' : 's'}`;
}

function tagsOf(field: string) {
  return field
    .split(/[,&]/)
    .map((s) => s.trim().replace(/^self-improvement in /i, ''))
    .filter(Boolean);
}

export default function EducationPage() {
  return (
    <div className="page-content">
      <div className="max-w-md mx-auto px-5 sm:px-4 py-6 sm:py-8">
        <div className="glass p-4 sm:p-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap size={22} className="text-accent" />
            <h2 className="text-lg font-bold text-foreground">Education</h2>
          </div>

          <div className="relative">
            {/* connecting line */}
            <div className="absolute left-[5px] top-4 bottom-4 w-px bg-white/10" />

            <div className="space-y-1">
              {education.map((entry) => {
                const current = entry.end === 'Present';
                return (
                  <div
                    key={entry.school}
                    className="relative pl-6 sm:pl-7 py-2.5 rounded-lg transition-colors hover:bg-white/[0.03]"
                  >
                    {current ? (
                      <span className="absolute left-0 top-[18px] flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                      </span>
                    ) : (
                      <div className="absolute left-0 top-[18px] w-2.5 h-2.5 rounded-full bg-accent/40 ring-4 ring-accent/10 z-10" />
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm sm:text-base font-semibold text-foreground">{entry.school}</p>
                      {current && (
                        <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
                          Present
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {tagsOf(entry.field).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-secondary border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1.5 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {entry.start} — {entry.end} · {duration(entry.start, entry.end)}
                      </span>
                      {entry.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {entry.location}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
