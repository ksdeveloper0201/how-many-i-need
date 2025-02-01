"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";

function CalcScore() {
    const [score, setScore] = useState<string>("");
    const [magScore, setMagScore] = useState<string>("");
    const [currentScore, setCurrentScore] = useState<string>("");

    // 現在の倍率
    const magnification = useMemo(() => {
        if (!magScore || !score) return 0;
        return parseInt(magScore) / parseInt(score);
    }, [score, magScore]);

    const resultScore = useMemo(() => {
        if (!currentScore || !magnification) return "-";
        const cScore = parseInt(currentScore);
        return Math.ceil(cScore + cScore * magnification);
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
                                <Label>スコア</Label>
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
                    <CardContent>
                        <div>
                            <Label>現在のスコア</Label>
                            <Input
                                type="text"
                                value={currentScore}
                                onChange={(e) =>
                                    setCurrentScore(e.target.value)
                                }
                            />
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
