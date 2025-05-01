import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const ViewToggle = ({
  view,
  setView,
}: {
  view: string;
  setView: (v: string) => void;
}) => (
  <ToggleButtonGroup
    value={view}
    exclusive
    onChange={(_, v) => v && setView(v)}
    size="small"
    sx={{ minWidth: 120 }}
  >
    <ToggleButton value="table" sx={{ width: 80 }}>
      표
    </ToggleButton>
    <ToggleButton value="chart" sx={{ width: 80 }}>
      그래프
    </ToggleButton>
  </ToggleButtonGroup>
);

export default ViewToggle;
