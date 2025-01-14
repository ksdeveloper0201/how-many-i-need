"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ユーティリティ関数: ゴール期日までの日数を計算
const calculateDaysUntilGoal = (goalDate: Date | undefined): number => {
    if (!goalDate) return 1; // ゴール日が未指定なら1日と仮定
    const today = new Date();
    const days = Math.ceil(
        (goalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days < 1 ? 1 : days; // 最小でも1日
};

function MainPage() {
    const [goalResource, setGoalResource] = useState(0); // 目標コイン数またはガチャ回数
    const [resourceKind, setResourceKind] = useState<string>("gacha-count"); // 算出対象
    const [oneTimeResource, setOneTimeResource] = useState(0); // 1回のガチャに必要なコイン数
    const [goalDate, setGoalDate] = useState<Date | undefined>(new Date()); // 目標期日
    const [currentResource, setCurrentResource] = useState(0); // 現在のコイン数

    // 必要なコイン数を計算
    const needResource = useMemo(() => {
        if (resourceKind === "gacha-count") {
            return goalResource * oneTimeResource;
        }
        return goalResource;
    }, [goalResource, oneTimeResource, resourceKind]);

    // ゴール期日までの日数を計算
    const goalDateAlong = useMemo(
        () => calculateDaysUntilGoal(goalDate),
        [goalDate]
    );

    // 1日あたりのノルマを計算
    const oneDayNorma = useMemo(() => {
        const remainingResource = needResource - currentResource;
        return Math.ceil(remainingResource / goalDateAlong);
    }, [needResource, currentResource, goalDateAlong]);

    // 算出対象の切り替え
    const changeResourceKind = (kind: string) => {
        setResourceKind(kind);
        setGoalResource(0); // 目標値をリセット
    };

    return (
        <div className="p-6 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>リソース計算ツール</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* リソース種別 */}
                    <div>
                        <Label>算出対象</Label>
                        <div className="flex space-x-4">
                            {["gacha-count", "resource-count"].map((kind) => (
                                <Button
                                    key={kind}
                                    variant={
                                        resourceKind === kind
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => changeResourceKind(kind)}
                                >
                                    {kind === "gacha-count"
                                        ? "ガチャ回数"
                                        : "コイン数"}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* 目標値入力 */}
                    <div>
                        <Label>
                            {resourceKind === "gacha-count"
                                ? "目標ガチャ回数"
                                : "目標コイン数"}
                        </Label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={goalResource}
                            onChange={(e) =>
                                setGoalResource(Number(e.target.value) || 0)
                            }
                        />
                    </div>

                    {/* 日付選択 */}
                    <div>
                        <Label>目標の年月日</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal"
                                    )}
                                >
                                    {goalDate
                                        ? goalDate.toLocaleDateString()
                                        : "日付を選択"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto">
                                <Calendar
                                    mode="single"
                                    selected={goalDate}
                                    onSelect={setGoalDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* その他入力項目 */}
                    <div>
                        <Label>一回のガチャに必要なコイン数</Label>
                        <Input
                            type="number"
                            placeholder="100"
                            value={oneTimeResource}
                            onChange={(e) =>
                                setOneTimeResource(Number(e.target.value) || 0)
                            }
                        />
                    </div>
                    <div>
                        <Label>現在のコイン数</Label>
                        <Input
                            type="number"
                            value={currentResource}
                            onChange={(e) =>
                                setCurrentResource(Number(e.target.value) || 0)
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* 結果表示 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>必要なコイン数</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{needResource.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>目標期日までの日数</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{goalDateAlong}日</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>1日あたり必要なコイン数</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{oneDayNorma.toLocaleString()}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default MainPage;
