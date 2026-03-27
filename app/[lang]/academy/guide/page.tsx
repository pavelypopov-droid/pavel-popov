"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { examGuide } from "@/lib/academy/exam-guide";

export default function ExamGuidePage() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/ru") ? "ru" : "en";
  const data = examGuide[lang];

  const [expandedDomain, setExpandedDomain] = useState<number | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);

  const toggleDomain = (id: number) =>
    setExpandedDomain((prev) => (prev === id ? null : id));
  const toggleScenario = (id: number) =>
    setExpandedScenario((prev) => (prev === id ? null : id));

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-[#e8e4f0] mb-2">{data.title}</h1>
      <p className="text-[#9890ab] mb-8">{data.subtitle}</p>

      {/* Exam format cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <FormatCard label={data.labels.questions} value={String(data.format.questions)} />
        <FormatCard label={data.labels.time} value={`${data.format.time} min`} />
        <FormatCard
          label={data.labels.passing}
          value={`${data.format.passing}/${data.format.maxScore}`}
        />
        <FormatCard label={data.labels.price} value={data.format.price} />
      </div>

      {/* Key info */}
      <div className="bg-[#1a1726] border border-[#2d2845] rounded-2xl p-4 mb-8 text-sm space-y-2">
        <div className="flex gap-2">
          <span className="text-[#7c5cfc]">*</span>
          <span className="text-[#9890ab]">{data.labels.multipleChoice}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#7c5cfc]">*</span>
          <span className="text-[#9890ab]">{data.labels.noPenalty}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#7c5cfc]">*</span>
          <span className="text-[#9890ab]">
            {data.labels.scenarioInfo
              .replace("{picked}", String(data.format.scenarios))
              .replace("{total}", String(data.format.totalScenarios))}
          </span>
        </div>
      </div>

      {/* Domains */}
      <h2 className="text-xl font-semibold text-[#e8e4f0] mb-4">{data.labels.domains}</h2>
      <div className="space-y-2 mb-8">
        {data.domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-[#1a1726] border border-[#2d2845] rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleDomain(domain.id)}
              className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-[#231f33] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono bg-[#7c5cfc]/15 text-[#7c5cfc] px-2 py-0.5 rounded font-medium">
                  {domain.weight}%
                </span>
                <span className="text-sm font-medium text-[#c4bdd4]">{domain.name}</span>
              </div>
              <span className="text-[#7a7290] text-xs">
                {expandedDomain === domain.id ? "^" : "v"}
              </span>
            </button>
            {expandedDomain === domain.id && (
              <div className="px-4 pb-4 border-t border-[#2d2845] pt-3">
                <div className="space-y-2">
                  {domain.taskStatements.map((ts, i) => (
                    <div key={i} className="text-sm text-[#9890ab] flex gap-2">
                      <span className="text-[#7c5cfc] shrink-0">
                        {domain.id}.{i + 1}
                      </span>
                      <span>{ts}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scenarios */}
      <h2 className="text-xl font-semibold text-[#e8e4f0] mb-4">{data.labels.scenarios}</h2>
      <div className="space-y-2 mb-8">
        {data.scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-[#1a1726] border border-[#2d2845] rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleScenario(scenario.id)}
              className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-[#231f33] transition-colors"
            >
              <span className="text-sm font-medium text-[#c4bdd4]">
                {scenario.id}. {scenario.title}
              </span>
              <span className="text-[#7a7290] text-xs">
                {expandedScenario === scenario.id ? "^" : "v"}
              </span>
            </button>
            {expandedScenario === scenario.id && (
              <div className="px-4 pb-4 border-t border-[#2d2845] pt-3">
                <p className="text-sm text-[#9890ab] mb-3">{scenario.description}</p>
                <div className="flex flex-wrap gap-1">
                  {scenario.domains.map((d, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#7c5cfc]/15 text-[#7c5cfc] px-2 py-0.5 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preparation tips */}
      {data.tips && data.tips.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-[#e8e4f0] mb-4">
            {data.labels.tipsTitle}
          </h2>
          <div className="space-y-2">
            {data.tips.map((tip, i) => (
              <div
                key={i}
                className="bg-[#1a1726] border border-[#2d2845] rounded-xl px-4 py-3 text-sm flex gap-3"
              >
                <span className="text-[#7c5cfc] font-mono shrink-0">{i + 1}.</span>
                <span className="text-[#9890ab]">{tip}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FormatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1726] border border-[#2d2845] rounded-2xl p-3 text-center">
      <div className="text-xl font-bold text-[#7c5cfc]">{value}</div>
      <div className="text-xs text-[#7a7290] mt-1">{label}</div>
    </div>
  );
}
