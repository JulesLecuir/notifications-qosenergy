import React, {useState} from "react";
import FormControl from "@mui/joy/FormControl";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import TreeItem from "@mui/lab/TreeItem";
import FormLabel from "@mui/joy/FormLabel";
import Sheet from "@mui/joy/Sheet";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import ChevronRightIcon from "@mui/icons-material/ChevronRight.js";
import {ConfigProvider, theme, Tree} from "antd";
import Stack from "@mui/joy/Stack";
import {Checkbox, Chip} from "@mui/joy";
import {useColorScheme} from "@mui/joy/styles";

export const DiscoverableTextField = ({discoverFieldLabel, ...props}) => {
  const [discovered, setDiscovered] = useState(props.value?.length > 0);

  return discovered ? (
    <FormControl>
      <TextField {...props} />
    </FormControl>
  ) : (
    <Button
      sx={{width: "fit-content"}}
      startDecorator={props.startDecorator}
      variant="outlined"
      onClick={() => setDiscovered(true)}>
      {discoverFieldLabel}
    </Button>
  );
};

export const MuiTree = ({options, label, name, value, setFieldValue}) => {
  const writeNode = (node) => (
    <TreeItem label={node.title} nodeId={node.key}>
      {node.children?.map(writeNode)}
    </TreeItem>
  );

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Sheet variant="outlined" sx={{borderRadius: 2, p: 2, maxHeight: 400, overflow: "auto"}}>
        <TreeView
          aria-label="multi-select"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
          selected={value}
          onNodeSelect={(_, selectedKeys) => setFieldValue(name, selectedKeys)}>
          {options.map(writeNode)}
        </TreeView>
      </Sheet>
    </FormControl>
  );
};

// Change AntDesign theme in the same time as MUI theme
const AntdToMuiThemeLinking = ({children}) => {
  const {defaultAlgorithm, darkAlgorithm} = theme;
  const {mode} = useColorScheme();
  const isDarkMode = mode === "dark";

  return (
    <ConfigProvider theme={{algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm}}>
      {children}
    </ConfigProvider>
  );
};

export const AntdTree = ({options, label, name, value, setFieldValue}) => {
  return (
    <AntdToMuiThemeLinking>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Sheet variant="outlined" sx={{borderRadius: 2, p: 2, maxHeight: 400, overflow: "auto"}}>
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={value}
            onCheck={(checkedKeys) => setFieldValue(name, checkedKeys)}
            treeData={options}
          />
        </Sheet>
      </FormControl>
    </AntdToMuiThemeLinking>
  );
};

export const ToggleChips = ({options, name, value, setFieldValue}) => {
  // https://mui.com/joy-ui/react-chip/#with-a-checkbox
  return (
    <Stack direction="row" columnGap={2} rowGap={1} flexWrap="wrap">
      {options.map(({key, label, title, icon: Icon}) => {
        const checked = value?.includes(key);
        return (
          <Chip
            key={key}
            title={title}
            variant={checked ? "soft" : "plain"}
            color={checked ? "primary" : "neutral"}
            startDecorator={Icon && <Icon />}>
            <Checkbox
              variant="outlined"
              disableIcon
              overlay
              label={label}
              checked={checked}
              onChange={(event) =>
                setFieldValue(
                  name,
                  !event.target.checked ? value.filter((n) => n !== key) : [...value, key]
                )
              }
            />
          </Chip>
        );
      })}
    </Stack>
  );
};
