import { Emoji } from "@/components/ui/emoji";

export function Achievements() {
  const achievements = [
    {
      icon: "🥉",
      title: "IOAI Bronze Medal (2024)",
      description: "International Olympiad in Artificial Intelligence."
    },
    {
      icon: "📜",
      title: "IOI Contestant (2023)",
      description:
        "Colombian delegate at International Olympiad in Informatics."
    },
    {
      icon: "🥇",
      title: "3x Gold Medalist (2021, 2022, 2023)",
      description: "National Olympiad in Informatics champion."
    },
    {
      icon: "🎓",
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
              <Emoji symbol={achievement.icon} className="w-6 h-6 shrink-0" />
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
