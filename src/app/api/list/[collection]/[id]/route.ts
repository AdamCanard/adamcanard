import db from "@/app/server/pb";

export async function GET(
  req: Request,
  { params }: { params: { collection: string; id: string } },
) {
  const data = await db.getById(params.collection, params.id);
  const keys = Object.keys(data);
  const newKeys: string[] = [];
  let uniqueIndex = 0;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].charAt(0) === "_") {
      newKeys.push(keys[i].slice(1));
      uniqueIndex = i;
    }
  }
  for (let i = 0; i < keys.length; i++) {
    if (uniqueIndex !== i) {
      newKeys.push(keys[i]);
    }
  }

  const newData = {} as object;
  const unique = "_" + newKeys[0];
  const uniqueCorrect = newKeys[0];
  for (let i = 0; i < Object.values(data).length; i++) {
    const objectKey = newKeys[i];
    //@ts-expect-error cant fix the type
    newData[objectKey as keyof object] = data[objectKey];
    //@ts-expect-error cant fix the type
    newData[uniqueCorrect as keyof object] = data[unique];
  }

  return new Response(JSON.stringify(newData), { status: 200 });
}
export async function DELETE(
  req: Request,
  { params }: { params: { collection: string; id: string } },
) {
  const data = await db.delete(params.collection, params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function PUT(
  req: Request,
  { params }: { params: { collection: string; id: string } },
) {
  const formData = await req.formData();

  const data = await db.update(params.collection, params.id, formData);
  return new Response(JSON.stringify(data), { status: 200 });
}
