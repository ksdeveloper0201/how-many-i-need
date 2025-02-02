import { cn } from "@/lib/utils";
import { LuSquareMenu } from "react-icons/lu";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";
import { menuList } from "@/config/menu-list";

const MenuBox: React.FC<{ className?: string }> = ({ className }) => {
    const MenuList: React.FC<{ redirectList: redirectObj[] }> = ({
        redirectList,
    }) => {
        return (
            <div className="flex flex-col items-center gap-2">
                {redirectList.map((redirect) => {
                    return (
                        <DrawerClose asChild key={redirect.id}>
                            <Link
                                href={redirect.url}
                                className="text-blue-500 hover:underline"
                            >
                                {redirect.label}
                            </Link>
                        </DrawerClose>
                    );
                })}
            </div>
        );
    };
    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 p-2 bg-white shadow-lg rounded-full",
                className
            )}
        >
            <Drawer>
                <DrawerTrigger>
                    {" "}
                    <LuSquareMenu className="text-3xl cursor-pointer" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>ツール一覧</DrawerTitle>
                        <DrawerDescription>
                            other tools can use
                        </DrawerDescription>
                    </DrawerHeader>
                    {menuList.map((menuObj) => {
                        if (menuObj.chunkLabel !== "other") {
                            return (
                                <>
                                    <Accordion
                                        key={menuObj.chunkId}
                                        type="single"
                                        collapsible
                                        className="w-full"
                                    >
                                        <AccordionItem
                                            value={menuObj.chunkLabel}
                                        >
                                            <AccordionTrigger className="flex flex-col items-center">
                                                {menuObj.chunkLabel}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <MenuList
                                                    redirectList={
                                                        menuObj.redirectList
                                                    }
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <MenuList
                                        redirectList={menuObj.redirectList}
                                    />
                                </>
                            );
                        }
                    })}
                    <DrawerFooter className="flex flex-col items-center">
                        <DrawerClose asChild>
                            <Button className="w-96" variant="default">
                                close
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default MenuBox;
