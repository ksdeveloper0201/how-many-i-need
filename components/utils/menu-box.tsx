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
import { Button } from "../ui/button";

const MenuBox: React.FC<{ className?: string }> = ({ className }) => {
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
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>
                            This action cannot be undone.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default MenuBox;
