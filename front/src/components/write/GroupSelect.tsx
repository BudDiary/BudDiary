import React, { useState, useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Info } from "../../types/group";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface GroupSelectProps {
  mygroup: Info[];
  selectGroup: string[];
  onChange: (selectGroup: string[]) => void;
}

export default function GroupSelect({
  mygroup,
  selectGroup,
  onChange,
}: GroupSelectProps) {
  // const [selectGroup, setSelectGroup] = useState<string[]>([]);
  // useEffect (() =>
  // console.log(selectGroup)
  // , [selectGroup])
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectGroup>) => {
    const {
      target: { value },
    } = event;
    onChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const consolelog = (e: any) => {
    if (selectGroup.includes(e.target.textContent)) {
      const idx = selectGroup.indexOf(e.target.textContent);
      selectGroup.splice(idx, 1);
      console.log("취소함", selectGroup);
    } else {
      selectGroup.push(e.target.textContent);
      console.log("추가함", selectGroup);
    }
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-multiple-name-label">&nbsp; 그룹</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectGroup}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {mygroup?.map((group: Info, index: number) => (
            <MenuItem key={index} value={group.clubUuid}>
              {group.clubName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
