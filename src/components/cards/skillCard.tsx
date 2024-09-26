import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Skill {
    title: string;
    items: Array<string>;
}

export default function SkillCard({ skill }: { skill: Skill }) {
    return (
        <Card
            key={skill.title}
            className="bg-gray-800 bg-opacity-90 border-purple-500 border-2 transition-all hover:border-purple-400"
        >
            <CardHeader>
                <CardTitle className="text-xl text-purple-300">
                    {skill.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                        <Badge
                            key={item}
                            variant="secondary"
                            className="bg-gray-700 text-purple-200 border border-purple-400 hover:cursor-default"
                        >
                            {item}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
