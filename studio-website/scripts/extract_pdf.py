import fitz
import os

pdf_path = r'd:\Ideaseternal_Projects\client_2_website\AfterBuild Studio _ Luxury Interiors & Architectural Design Bangalore.pdf'
out_dir = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public\images\extracted'
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")
for i, page in enumerate(doc):
    image_list = page.get_images(full=True)
    print(f"Page {i+1} has {len(image_list)} images")
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_img = doc.extract_image(xref)
        ext = base_img["ext"]
        w = base_img["width"]
        h = base_img["height"]
        fn = os.path.join(out_dir, f"img_p{i+1}_{img_idx+1}_{xref}_{w}x{h}.{ext}")
        with open(fn, "wb") as f:
            f.write(base_img["image"])
        print(f"Extracted: {fn} ({w}x{h}, {len(base_img['image'])} bytes)")
