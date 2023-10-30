import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { pipe } from "fp-ts/lib/function";
import { useState } from "react";
import { fromBech32 } from "@cosmjs/encoding";
import * as E from "fp-ts/lib/Either";
import { Check, NotInterested } from "@mui/icons-material";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const bech32Validity = (address: string) => {
  const bech32Prefix = "dydx";
  const validatorPrefix = "dydxvaloper";
  return pipe(
    address,
    E.of,
    E.chain((addressInput) =>
      E.tryCatch(
        () => fromBech32(addressInput),
        (err) => (err as Error).toString()
      )
    ),
    E.filterOrElse(
      ({ prefix }) => prefix === bech32Prefix || prefix === validatorPrefix,
      () => `Incorrect bech32 prefix- expected ${bech32Prefix}`
    )
  );
};

export const ReceiverAddressInput = ({ value, onChange }: Props) => {
  const [editable, setEditable] = useState(true);

  const isValidAddress = bech32Validity(value);

  return (
    <Box>
      {/* <Box flexDirection="row" alignItems="baseline">
        <Checkbox
          name="receive-dydx-to-another-wallet"
          value={!editable}
          onChange={(e) => setEditable(e.target.value === "true")}
        />
        <>Receive to another wallet</>
      </Box> */}

      {/* <Typography>Receiver Address</Typography> */}
      {editable && (
        <TextField
          size="small"
          fullWidth
          name="amount"
          label="Receiver Address"
          onChange={(e) => onChange(e.target.value)}
          type="text"
          id="amount"
          autoComplete="dydx-to-bridge"
          value={value}
          error={value.length > 6 && E.isLeft(isValidAddress)}
          InputProps={{
            endAdornment: value.length > 6 && E.isLeft(isValidAddress) && (
              <InputAdornment position="start">
                <Tooltip title={isValidAddress.left}>
                  <IconButton>
                    <NotInterested htmlColor="red" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      )}
    </Box>
  );
};
