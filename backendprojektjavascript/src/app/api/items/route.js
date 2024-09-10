// -_-
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Creating deconstructed primsaclient
const prisma = new PrismaClient();

// Get all items, filter by name and quantity
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  //   Initializing an array for the items that we are gonna get.
  let items = [];

  const search = searchParams.get("search");

  //   TODO  --__-- add radio buttons for category choice and choosen value goes into URL dynamicaly
  //   TODO  --__-- add possibility for mulitpole search choicces
  if (search) {
    try {
      items = await prisma.item.findMany({
        where: {
          category: {
            contains: search,
            mode: "insensitive",
          },
        },
      });
      console.log(items);

      //   IF successfull return 200
      return NextResponse.json(items, { status: 200 });
    } catch (error) {
      console.log("Error: ", error);
      return NextResponse.json(
        {
          message: "Invalid Json",
        },
        {
          status: 404,
        }
      );
    }
  } else {
    items = await prisma.item.findMany();
    console.log(items);
    return NextResponse.json(items, { status: 200 });
  }
};

// Post an ITEM to the ITEM LIST DB
export const POST = async (req) => {
  let body;
  console.log("item received: ", body);
  try {
    // Getting the specs for the new item to be added
    body = await req.json();
    console.log("Body: ", body);
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      {
        message: "Invalid Json",
      },
      {
        status: 400,
      }
    );
  }

  //TODO VALIDERINGS FUNKTION
  // --------------------___----------------------

  //   TRY TO POST THE NEW ITEM TO PRISMA AND DB

  try {
    const Item = await prisma.item.create({
      data: {
        name: body.name,
        quantity: Number(body.quantity),
        inStock: Number(body.quantity) > 0,
        category: body.category,
        description: body.description,
      },
    });
    console.log(Item);
    const userId = req.headers.get("userId");
    return NextResponse.json({ Item });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      {
        message: "Invalid Json",
      },
      {
        status: 404,
      }
    );
  }
};
