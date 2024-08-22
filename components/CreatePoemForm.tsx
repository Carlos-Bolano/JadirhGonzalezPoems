import React from "react";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/Button";

const CreatePoemForm = () => {
  return (
    <form>
      <Input
        label="Title of Poem"
        name="title"
        type="text"
        placeholder="love and other drugs of life"
        required
      />

      <Textarea
        className="mt-4"
        label="Content of Poem"
        name="content"
        rows={5}
        placeholder="love and other drugs of life"
        required
      />

      <div className="mt-4 flex flex-wrap gap-4 justify-between">
        <Select name="time">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time of reading" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Times</SelectLabel>
              <SelectItem value="2">2 Minutes</SelectItem>
              <SelectItem value="3">3 Minutes</SelectItem>
              <SelectItem value="4">4 Minutes</SelectItem>
              <SelectItem value="5">5 Minutes</SelectItem>
              <SelectItem value="+5">More than 5 minutes</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="default" size={"lg"}>
          Save Poem
        </Button>
      </div>
    </form>
  );
};

export default CreatePoemForm;
