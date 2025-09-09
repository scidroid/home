import { HugeiconsIcon } from "@hugeicons/react";
import { 
  MedalIcon, 
  Certificate01Icon, 
  DiplomaIcon 
} from "@hugeicons/core-free-icons";

export function Achievements() {
  const achievements = [
    {
      icon: MedalIcon,
      color: "#CD7F32",
      title: "IOAI Bronze Medal",
      description: "International Olympiad in Artificial Intelligence."
    },
    {
      icon: Certificate01Icon,
      color: "#1E40AF",
      title: "IOI Representative",
      description: "Colombian delegate at International Olympiad in Informatics."
    },
    {
      icon: MedalIcon,
      color: "#FFD700",
      title: "3x Gold Medalist",
      description: "National Olympiad in Informatics champion."
    },
    {
      icon: DiplomaIcon,
      color: "#7C3AED",
      title: "Rise Fellow",
      description: "Rhodes Trust & Schmidt Futures full scholarship."
    }
  ];

  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">Recognition & Awards</h3>
      <div className="space-y-2">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-start gap-3">
            <HugeiconsIcon
              icon={achievement.icon}
              className="w-6 h-6 mt-0.5 flex-shrink-0"
              color={achievement.color}
              strokeWidth={2}
            />
            <div>
              <h4 className="font-medium text-base">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 