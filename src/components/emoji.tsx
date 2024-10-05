import Image, { StaticImageData } from "next/image";
import exampleEmoji from "@/images/example_emoji.png";
import dizzyEmoji from "@/images/dizzy.png";
import fineEmoji from "@/images/fine.png";
import happinessEmoji from "@/images/happiness.png";
import happyEmoji from "@/images/happy.png";
import sadEmoji from "@/images/sad.png";
import sickEmoji from "@/images/sick.png";
import sleepyEmoji from "@/images/sleepy.png";
import thankfulEmoji from "@/images/thankful.png";
import tiredEmoji from "@/images/tired.png";

export type EmojiName =
  | "example_emoji"
  | "dizzy"
  | "fine"
  | "happiness"
  | "happy"
  | "sad"
  | "sick"
  | "sleepy"
  | "thankful"
  | "tired";

const emojiNameImageMapping: Partial<Record<EmojiName, StaticImageData>> = {
  example_emoji: exampleEmoji,
  dizzy: dizzyEmoji,
  fine: fineEmoji,
  happiness: happinessEmoji,
  happy: happyEmoji,
  sad: sadEmoji,
  sick: sickEmoji,
  sleepy: sleepyEmoji,
  thankful: thankfulEmoji,
  tired: tiredEmoji,
};

export default function Emoji({
  name,
  selected = false,
  onClick,
}: {
  name: EmojiName;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`btn bg-transparent h-auto px-0 py-4 border-none active:bg-slate-400 shadow-md bg-white ${
        selected ? "bg-slate-400" : ""
      }`}
      onClick={onClick}
    >
      <Image
        src={emojiNameImageMapping[name] ?? exampleEmoji}
        alt="example_emoji"
        className="w-20"
      />
    </button>
  );
}
