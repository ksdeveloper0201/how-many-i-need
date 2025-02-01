"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

function CalcScore() {
    const [score, setScore] = useState<string>("");
    const [magScore, setMagScore] = useState<string>("");
    const [currentScore, setCurrentScore] = useState<string>("");
    const [scoreKind, setScoreKind] = useState<string>("score");

    // 現在の倍率
    const magnification = useMemo(() => {
        if (!magScore || !score) return 0;
        const intScore = parseInt(score);
        const intMagScore = parseInt(magScore);
        if (scoreKind === "score") {
            return intMagScore / intScore;
        } else if (scoreKind === "sumScore") {
            return intMagScore / (intScore - intMagScore);
        }
    }, [score, magScore, scoreKind]);

    const resultScore = useMemo(() => {
        if (!currentScore || !magnification) return "-";
        const cScore = parseInt(currentScore);
        return Math.floor(cScore + cScore * magnification);
    }, [magnification, currentScore]);

    return (
        <div>
            <div className="w-full h-full flex flex-col mt-4 items-center justify-center gap-4">
                <Card className="w-96">
                    <CardHeader>
                        <div className="flex items-center gap-2 justify-between">
                            <CardTitle>ツムツムスコア計算ツール</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-col flex gap-4">
                        <div className="flex flex-col gap-3">
                            <p>スコア倍率計算</p>
                            <p className="text-xs">スコア結果を各項目に入力</p>
                            <div>
                                <div className="flex mb-2">
                                    {["score", "sumScore"].map((kind) => {
                                        return (
                                            <Button
                                                key={kind}
                                                className="font-bold rounded-none text-xs size-auto"
                                                variant={
                                                    scoreKind === kind
                                                        ? "default"
                                                        : "outline"
                                                }
                                                onClick={() =>
                                                    setScoreKind(kind)
                                                }
                                            >
                                                {kind === "score"
                                                    ? "スコア(プレイ画面)"
                                                    : "スコア(リザルト)"}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <Input
                                    type="text"
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>倍率加算スコア</Label>
                                <Input
                                    type="text"
                                    value={magScore}
                                    onChange={(e) =>
                                        setMagScore(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <p>現在の倍率</p>
                                <p>{magnification}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="w-96">
                    <CardHeader>
                        <CardTitle>スコア検証</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-col flex gap-3">
                        <div>
                            <Label>現在のスコア</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={currentScore}
                                    onChange={(e) =>
                                        setCurrentScore(e.target.value)
                                    }
                                />
                                <Button
                                    className="font-bold "
                                    onClick={() => setCurrentScore("")}
                                >
                                    クリア
                                </Button>
                            </div>
                        </div>
                        <div>
                            <p>倍率加算後のスコア</p>
                            <p>{resultScore} </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default CalcScore;
