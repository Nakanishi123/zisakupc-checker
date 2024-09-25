import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { getSelectedRecord } from "../util/storage";
import "./Dashboard.css";
import ItemSelect from "./components/Configelect";

function Dashboard() {
  const [selected, setSelected] = useState<string[]>([]);
  const drawerWidth = 240;

  useEffect(() => {
    (async () => {
      const selectedRecord = await getSelectedRecord();
      const keys = Object.keys(selectedRecord);
      keys.sort();
      setSelected(keys);
    })();
  }, []);
  return (
    <>
      <Box
        height="100vh"
        display="grid"
        gridTemplateColumns={`${drawerWidth}px minmax(0, 1fr)`}
        gridTemplateRows="50px minmax(0, 1fr)"
      >
        <Typography
          textAlign={"center"}
          color="primary.contrastText"
          variant="h5"
          padding={1}
          gridArea=" 1 / 1 / 2 / 3"
          sx={{ backgroundColor: "primary.main", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          自作PCチェッカー
        </Typography>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <Box marginTop="50px" sx={{ overflowY: "auto", overflowX: "hidden" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#setting">
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Setting" />
                </ListItemButton>
              </ListItem>
              <Divider />
              {selected.map((text) => (
                <ListItem disablePadding key={text}>
                  <ListItemButton component="a" href={`#/${text}`}>
                    <ListItemIcon>
                      <FolderSpecialIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <ItemSelect />
      </Box>
    </>
  );
}

export default Dashboard;
