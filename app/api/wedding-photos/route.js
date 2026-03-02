import { supabase } from "../../../lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("wedding_photos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const comment = formData.get("comment") || "";
    const image = formData.get("image");

    if (!name || !image) {
      return NextResponse.json(
        { error: "Name and image are required" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPG, PNG, WEBP, or HEIC image." },
        { status: 400 }
      );
    }

    // Sanitize filename
    const ext = image.name.split(".").pop().toLowerCase();
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // Upload to Supabase Storage
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("wedding-photos")
      .upload(safeName, buffer, {
        contentType: image.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("wedding-photos")
      .getPublicUrl(safeName);

    const imageUrl = urlData.publicUrl;

    // Insert record into wedding_photos table
    const { data, error } = await supabase
      .from("wedding_photos")
      .insert([{ uploader_name: name.trim(), comment: comment.trim(), image_url: imageUrl }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process upload" }, { status: 500 });
  }
}
