import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";

export function LeftPanel({ width }) {
  return (
    <div className={`w-[${width}]`}>

      <SectionHeader title="inventory" icon="/inventory.svg" width={16} height={16} bgColor={"background"} />

      <ToolTip text="Healing Salve which provides HP to the user" position="top">
        <ListItem text="Healing Salve" amount="20" />
      </ToolTip>
      <ListItem text="Minor Mana" amount="20" />
      <ListItem text="Antidote" amount="20" />
      <ListItem text="Great Healing Potion" amount="20" />
      <ListItem text="Vitality Tonic" amount="20" />

      <SectionHeader title="resources" icon="/resources.svg" width={20} height={20} bgColor={"background"} />

      <ListItem text="Herbs" amount="20" />
      <ListItem text="Water" amount="20" />
      <ListItem text="Coal" amount="20" />
      <ListItem text="Mana Leaves" amount="20" />
      <ListItem text="Crystal Shards" amount="20" />

    </div>
  )
}