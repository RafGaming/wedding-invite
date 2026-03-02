import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

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
  const formData = await request.formData();
  const name = formData.get("name");
  const comment = formData.get("comment") || "";
  const image = formData.get("image");

  if (!name || !image) {
    return NextResponse.json(
      { error: "Name and image are required." },
      { status: 400 }
    );
  }

  const randomString = Math.random().toString(36).slice(2, 8);
  const filename = `${Date.now()}-${randomString}-${image.name}`;

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from("wedding-photos")
    .upload(filename, buffer, { contentType: image.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("wedding-photos")
    .getPublicUrl(filename);

  const imageUrl = urlData.publicUrl;

  const { data, error: insertError } = await supabase
    .from("wedding_photos")
    .insert({ uploader_name: name, comment, image_url: imageUrl })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
