import { addSelected, getSelectedUnselected } from "@/entrypoints/util/storage";
import { ProductWithNum } from "@/entrypoints/util/types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

function ConfigSelect() {
  const { configName } = useParams();
  const [selected, setSelected] = useState<ProductWithNum[]>([]);
  const [unselected, setUnselected] = useState<ProductWithNum[]>([]);
  const [listName, setListName] = useState(configName || "");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const swapProduct = (url: string) => {
    const indexInSelected = selected.findIndex((item) => item.url === url);
    if (indexInSelected !== -1) {
      const [foundProduct] = selected.splice(indexInSelected, 1);
      unselected.unshift(foundProduct);
    } else {
      const indexInUnselected = unselected.findIndex((item) => item.url === url);
      if (indexInUnselected !== -1) {
        const [foundProduct] = unselected.splice(indexInUnselected, 1);
        foundProduct.num = Math.max(1, foundProduct.num);
        selected.push(foundProduct);
      }
    }
    setSelected([...selected]);
    setUnselected([...unselected]);
  };

  const getChangeNum = (url: string) => {
    return (num: number) => {
      const index = selected.findIndex((item) => item.url === url);
      if (index !== -1) {
        selected[index].num = num;
        setSelected([...selected]);
      }
    };
  };

  useEffect(() => {
    setListName(configName || "");
    (async () => {
      const selectConfig = await getSelectedUnselected(configName);
      if (selectConfig) {
        setSelected(selectConfig.selected);
        setUnselected(selectConfig.unselected);
      }
    })();
  }, [configName]);

  const totalPrice = selected.reduce((acc, product) => acc + (product.price || 0) * product.num, 0);
  const totalPoint = selected.reduce((acc, product) => acc + (product.point || 0) * product.num, 0);

  const handleSave = () => {
    if (selected.length === 0 || !listName) return;
    addSelected(listName, selected);
    setSaveSuccess(true);
  };

  return (
    <Box
      display={"grid"}
      height={"100%"}
      gap={1}
      gridTemplateRows={"50px minmax(0, 1fr)"}
      gridTemplateColumns={"2fr 25px 1fr"}
    >
      <Box gridArea="1 / 1 / 2 / 4" display="flex" alignItems="center" justifyContent="center" margin={1}>
        <Box display="flex">
          <Typography variant="h5">¥{totalPrice}</Typography>
          {totalPoint == 0 && <Typography variant="h5">({totalPoint}pt)</Typography>}
        </Box>
        <Box display="flex" alignItems="center" position="absolute" right={10}>
          <TextField
            label="リスト名"
            variant="standard"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            slotProps={{ htmlInput: () => {} }}
          />
          <Button variant="contained" sx={{ height: "40px" }} onClick={handleSave}>
            保存
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "min-content",
          gap: 1,
          border: 1,
          margin: 1,
          padding: 1,
          overflowY: "auto",
        }}
      >
        {unselected.map((product) => (
          <ProductCard key={product.url} product={product} switchProduct={() => swapProduct(product.url)} />
        ))}
      </Box>
      <ArrowForwardIcon sx={{ alignSelf: "center", justifySelf: "center" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          border: 1,
          margin: 1,
          padding: 1,
          overflowY: "auto",
        }}
      >
        {selected.map((product) => (
          <ProductCard
            key={product.url}
            product={product}
            showNum={true}
            switchProduct={() => swapProduct(product.url)}
            changeNum={getChangeNum(product.url)}
          />
        ))}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={saveSuccess}
        autoHideDuration={6000}
        onClose={() => setSaveSuccess(false)}
        message="保存が成功しました"
      />
    </Box>
  );
}

export default ConfigSelect;
