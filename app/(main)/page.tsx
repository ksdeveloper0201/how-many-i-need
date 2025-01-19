"use client";

import { useEffect, useMemo, useState } from "react";
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

const calculateDaysUntilGoal = (goalDate: Date | undefined): number => {
    if (!goalDate) return 1;
    const today = new Date();
    const days = Math.ceil(
        (goalDate.getTime() - today.setHours(0, 0, 0, 0)) /
            (1000 * 60 * 60 * 24)
    );
    return Math.max(days, 1);
};

function MainPage() {
    const [goalResource, setGoalResource] = useState<number>(0);
    const [resourceKind, setResourceKind] = useState<string>("gacha-count");
    const [oneTimeResource, setOneTimeResource] = useState<number>(0);
    const [goalDate, setGoalDate] = useState<Date | undefined>(new Date());

    const [currentResource, setCurrentResource] = useState<number>(0);
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const [generatedUrl, setGeneratedUrl] = useState<string>("");

    const needResource = useMemo(() => {
        if (resourceKind === "gacha-count") {
            return goalResource * oneTimeResource;
        }
        return goalResource;
    }, [goalResource, oneTimeResource, resourceKind]);

    const goalDateAlong = useMemo(
        () => calculateDaysUntilGoal(goalDate),
        [goalDate]
    );

    const oneDayNorma = useMemo(() => {
        const remainingResource = needResource - currentResource;
        return Math.ceil(remainingResource / goalDateAlong);
    }, [needResource, currentResource, goalDateAlong]);

    const goalGachaCount = useMemo(() => {
        if (!needResource || !oneTimeResource) return 0;
        return Math.floor(needResource / oneTimeResource);
    }, [needResource, oneTimeResource]);

    const currentGachaCount = useMemo(() => {
        if (!currentResource || !oneTimeResource) return 0;
        return Math.floor(currentResource / oneTimeResource);
    }, [currentResource, oneTimeResource]);

    useEffect(() => {
        const params = new URLSearchParams({
            goalResource: encodeURIComponent(goalResource.toString()),
            resourceKind: encodeURIComponent(resourceKind),
            oneTimeResource: encodeURIComponent(oneTimeResource.toString()),
            goalDate: goalDate
                ? encodeURIComponent(goalDate.toISOString())
                : "",
            currentResource: encodeURIComponent(currentResource.toString()),
        });
        setGeneratedUrl(`${window.location.origin}/?${params.toString()}`);
    }, [
        goalResource,
        resourceKind,
        oneTimeResource,
        goalDate,
        currentResource,
    ]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setGoalResource(parseInt(params.get("goalResource") ?? "0"));
            setResourceKind(params.get("resourceKind") ?? "gacha-count");
            setOneTimeResource(parseInt(params.get("oneTimeResource") ?? "0"));
            setGoalDate(
                params.get("goalDate")
                    ? new Date(decodeURIComponent(params.get("goalDate")!))
                    : new Date()
            );
            setCurrentResource(parseInt(params.get("currentResource") ?? "0"));
        }
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
    };

    const changeResourceKind = (kind: string) => {
        setResourceKind(kind);
        setGoalResource(0);
    };

    return (
        <div className="p-6 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>リソース計算ツール</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                                    aria-label={
                                        kind === "gacha-count"
                                            ? "ガチャ回数を設定"
                                            : "コイン数を設定"
                                    }
                                >
                                    {kind === "gacha-count"
                                        ? "ガチャ回数"
                                        : "コイン数"}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label>
                            {resourceKind === "gacha-count"
                                ? "目標ガチャ回数"
                                : "目標コイン数"}
                        </Label>
                        <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={goalResource}
                            onChange={(e) =>
                                setGoalResource(
                                    Math.max(Number(e.target.value) || 0, 0)
                                )
                            }
                        />
                    </div>

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

                    <div>
                        <Label>一回のガチャに必要なコイン数</Label>
                        <Input
                            type="number"
                            min="0"
                            placeholder="100"
                            value={oneTimeResource}
                            onChange={(e) =>
                                setOneTimeResource(
                                    Math.max(Number(e.target.value) || 0, 0)
                                )
                            }
                        />
                    </div>
                    <div>
                        <Label>現在のコイン数</Label>
                        <Input
                            type="number"
                            min="0"
                            value={currentResource}
                            onChange={(e) =>
                                setCurrentResource(
                                    Math.max(Number(e.target.value) || 0, 0)
                                )
                            }
                        />
                    </div>
                </CardContent>
            </Card>

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
                <Card>
                    <CardHeader>
                        <CardTitle>ガチャ回数</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>現在: {currentGachaCount} 回</p>
                        <p>目標達成時: {goalGachaCount} 回</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>共有用URL</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input readOnly value={generatedUrl} />
                    <Button onClick={copyToClipboard}>URLをコピー</Button>
                    {copySuccess && (
                        <p className="text-green-500">
                            URLがコピーされました！
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default MainPage;
