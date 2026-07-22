import {
  Certificate01Icon,
  DiplomaIcon,
  MedalIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function Achievements() {
  const achievements = [
    {
      icon: MedalIcon,
      color: "#CD7F32",
      title: "IOAI Bronze Medal (2024)",
      description: "International Olympiad in Artificial Intelligence."
    },
    {
      icon: Certificate01Icon,
      color: "#1E40AF",
      title: "IOI Contestant (2023)",
      description:
        "Colombian delegate at International Olympiad in Informatics."
    },
    {
      icon: MedalIcon,
      color: "#FFD700",
      title: "3x Gold Medalist (2021, 2022, 2023)",
      description: "National Olympiad in Informatics champion."
    },
    {
      icon: DiplomaIcon,
      color: "#7C3AED",
      title: "Rise Fellow (2024)",
      description: "Rhodes Trust & Schmidt Futures full scholarship."
    }
  ];

  return (
    <section>
      <h3 className="text-xl font-semibold mb-3">Honors & Awards</h3>
      <div className="space-y-3 lg:space-y-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-0 lg:bg-transparent lg:rounded-none"
          >
            <div className="flex flex-row items-center gap-2 sm:gap-3 text-left">
              <HugeiconsIcon
                icon={achievement.icon}
                className="w-6 h-6 shrink-0"
                color={achievement.color}
                strokeWidth={2}
              />
              <div>
                <h4 className="font-medium text-gray-900">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {achievement.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
