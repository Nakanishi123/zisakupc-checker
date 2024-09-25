import noImageSqure from "@/assets/no_image_square.avif";
import { ProductWithNum } from "@/entrypoints/util/types";
import AddIcon from "@mui/icons-material/Add";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, IconButton, Typography } from "@mui/material";

interface ProductCardProps {
  product: ProductWithNum;
  showNum?: boolean;
  switchProduct: () => void;
  changeNum?: (num: number) => void;
}

function ProductCard({ product, showNum, switchProduct, changeNum }: ProductCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        height: 80,
        minHeight: 80,
        border: 1,
        borderRadius: 1,
        borderColor: "primary.main",
        overflow: "hidden",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        component="img"
        sx={{ borderRight: 1, borderColor: "primary.main", width: 80, objectFit: "cover" }}
        src={product.imagePath || noImageSqure}
        alt="product image"
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ flex: "1 0 auto", p: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              fontSize={15}
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.name}
            </Typography>
            <IconButton color="primary" size="small" href={product.url} target="_blank">
              <OpenInNewIcon sx={{ height: 20 }} />
            </IconButton>
          </Box>
          <Box display="flex" gap={2}>
            <Typography fontSize={15} color="text.secondary">
              {product.price ? `¥${product.price}` : "-"}
              {product.point ? ` (${product.point}pt)` : ""}
            </Typography>
            <Box display="flex" gap={1}>
              {changeNum && (
                <Button
                  sx={{ minWidth: 0, padding: 0 }}
                  size="small"
                  onClick={() => changeNum(Math.max(0, product.num - 1))}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
              )}
              {showNum && (
                <Typography fontSize={15} color="text.primary">
                  {product.num}
                </Typography>
              )}
              {changeNum && (
                <Button sx={{ minWidth: 0, padding: 0 }} size="small" onClick={() => changeNum(product.num + 1)}>
                  <AddIcon fontSize="small" />
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Button sx={{ minWidth: 0, padding: 0, borderLeft: 1, borderRadius: 0 }} size="small" onClick={switchProduct}>
        <CompareArrowsIcon />
      </Button>
    </Box>
  );
}

export default ProductCard;
