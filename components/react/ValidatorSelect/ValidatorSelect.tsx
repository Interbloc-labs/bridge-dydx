import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQueryValidators } from "./useQueryValidators";
import Image from "next/image";

type Props = {
  validatorAddress: string;
  onChange: (validatorAddress: string) => void;
};

export const ValidatorSelect = ({ validatorAddress, onChange }: Props) => {
  const { data: validators } = useQueryValidators();

  return (
    <FormControl fullWidth>
      <InputLabel id="validator-selection-id">Validator</InputLabel>
      <Select
        labelId="validator-selection-id"
        id="validator-selection"
        value={validatorAddress}
        label="Validator"
        onChange={(e) => onChange(e.target.value)}
      >
        {validators?.map((validator) => (
          <MenuItem
            sx={{
              backgroundColor:
                validator.operator_address ===
                "dydxvaloper15004ysvmqnqzkvt7x6s4cd53flmmvgfvyqk90h"
                  ? "rgba(144, 202, 249, 0.32)"
                  : undefined,
            }}
            value={validator.operator_address}
            key={validator.operator_address}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <img
                style={{ borderRadius: "50%" }}
                height={"25px"}
                width={"25px"}
                src={validator.icon}
                alt={`${validator.description.moniker} icon`}
              />{" "}
              <span>{validator.description.moniker}</span>
            </Box>
          </MenuItem>
        ))}
        {/* <MenuItem value={10}>Ten</MenuItem> */}
      </Select>
    </FormControl>
  );
};
