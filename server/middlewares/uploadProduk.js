import multer from "multer";
import path from "path";

const storageProduk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/produk"); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const uploadProduk = multer({ storage: storageProduk });

export default uploadProduk;
