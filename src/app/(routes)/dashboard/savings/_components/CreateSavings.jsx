"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { savings} from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateSaving({ refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState("😀");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
  
    const { user } = useUser();
    const onCreateSaving = async () => {
        const result = await db
          .insert(savings)
          .values({
            name: name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon,
          })
          .returning({ insertedId: savings.id });

        if(result){
            refreshData()
            toast("new saving created")

        }
    }
    return (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <div
                className="bg-slate-100 p-10 rounded-2xl
                items-center flex flex-col border-2 border-dashed
                cursor-pointer hover:shadow-md"
              >
                <h2 className="text-3xl">+</h2>
                <h2>Create New savings  Source</h2>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New savings Source</DialogTitle>
                <DialogDescription>
                  <div className="mt-5">
                    <Button
                      variant="outline"
                      className="text-lg"
                      onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    >
                      {emojiIcon}
                    </Button>
                    <div className="absolute z-20">
                      <EmojiPicker
                        open={openEmojiPicker}
                        onEmojiClick={(e) => {
                          setEmojiIcon(e.emoji);
                          setOpenEmojiPicker(false);
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <h2 className="text-black font-medium my-1">Source Name</h2>
                      <Input
                        placeholder="e.g. bank"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <h2 className="text-black font-medium my-1"> Amount</h2>
                      <Input
                        type="number"
                        placeholder="e.g. 5000rs"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    disabled={!(name && amount)}
                    onClick={() => onCreateSaving()}
                    className="mt-5 w-full rounded-full"
                  >
                    Create saving Source
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
    
    export default CreateSaving;

