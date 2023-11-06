import React, { useState } from "react";
import { Box, Button, Checkbox, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import "./App.css";

//using twlind and mui components

//my data
const imagesData = [
  {
    id: 1,
    src: "/images/image-1.webp",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "/images/image-2.webp",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "/images/image-3.webp",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "/images/image-4.webp",
    alt: "Image 4",
  },
  {
    id: 5,
    src: "/images/image-5.webp",
    alt: "Image 5",
  },
  {
    id: 6,
    src: "/images/image-6.webp",
    alt: "Image 6",
  },
  {
    id: 7,
    src: "/images/image-7.webp",
    alt: "Image 7",
  },
  {
    id: 8,
    src: "/images/image-8.webp",
    alt: "Image 8",
  },
  {
    id: 9,
    src: "/images/image-9.webp",
    alt: "Image 9",
  },
  {
    id: 10,
    src: "/images/image-10.jpeg",
    alt: "Image 10",
  },
  {
    id: 11,
    src: "/images/image-11.jpeg",
    alt: "Image 11",
  },
];

const imageBox = {
  position: "relative",
  "&:hover::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.4)",
  },

  "&:hover .image-checkbox": {
    opacity: 1,
  },
};

const App = () => {
  const [images, setImages] = useState(imagesData); //data  set to state
  const [selectedImages, setSelectedImages] = useState([]); // set selected image
  const [draggedIndex, setDraggedIndex] = useState(null); // dragable  index  set

  //image clicking  function
  const handleImageClick = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  //for  deleting images
  const handleDeleteImages = () => {
    const remainingImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(remainingImages);
    setSelectedImages([]);
  };

  //drag start function
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    setDraggedIndex(index);
  };

  // when hover with draged image  over images function
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //images droped function
  const handleDrop = (e, dropedIndex) => {
    e.preventDefault();
    const dragEnterIndex = draggedIndex;
    reorderArray(dragEnterIndex, dropedIndex);
  };

  //reorder shorting  drag and drop array short
  const reorderArray = (dragEnterIndex, dropedIndex) => {
    const updatedArray = [...images];
    console.log("updatedArray", updatedArray);
    const [movedItem] = updatedArray.splice(dragEnterIndex, 1);
    updatedArray.splice(dropedIndex, 0, movedItem);
    setImages(updatedArray);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          mt: "20px",
          mb: "20px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            {selectedImages.length ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "left" },
                  pl: { sm: "20px" },
                }}
              >
                <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "blue",
                    },
                  }}
                  disabled
                  checked
                />
                <Typography
                  sx={{
                    fontSize: "25px",
                    fontWeight: "600",
                  }}
                >
                  {selectedImages.length} File
                  {selectedImages.length > 1 ? "s" : ""} selected
                </Typography>
              </Box>
            ) : (
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "600",
                  textAlign: { xs: "center", sm: "left" },
                  pl: { sm: "20px" },
                }}
              >
                Gallery
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              textAlign: { sm: "right", xs: "center" },
              pr: { sm: "20px" },
            }}
          >
            <Button
              size="small"
              sx={{ color: "red" }}
              onClick={handleDeleteImages}
            >
              Delete file
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <Box
          sx={{
            padding: {
              sm: 5,
            },
          }}
        >
          <Box>
            <Box className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
              {images.map((image, i) => (
                <Box
                  key={i}
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, i)}
                  draggable
                  className={`relative image-container border border-solid border-black rounded-md ${
                    i === 0 ? "row-span-2 col-span-2" : ""
                  }`}
                  sx={imageBox}
                >
                  <CardMedia
                    component="img"
                    image={image.src}
                    height="100%"
                    alt={image.alt}
                    sx={{
                      height: "100%",
                      filter: selectedImages.includes(image.id)
                        ? "saturate(40%) contrast(80%)"
                        : "none",
                      borderRadius: "6px",
                    }}
                  />

                  <Checkbox
                    className="image-checkbox"
                    sx={{
                      position: "absolute",
                      top: 1,
                      left: 1,
                      opacity: selectedImages.includes(image.id) ? 1 : 0,
                      color: selectedImages.includes(image.id)
                        ? "transparent"
                        : "white",
                    }}
                    checked={selectedImages.includes(image.id)}
                    onChange={() => handleImageClick(image.id)}
                  />
                </Box>
              ))}

              <CardMedia
                component="img"
                image="/images/lastadd.png"
                height="100%"
                sx={{
                  height: "100%",
                  borderRadius: "6px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
