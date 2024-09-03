// -_-
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Creating deconstructed primsaclient
const prisma = new PrismaClient();

// Finding a specefic ID
export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const item = await prisma.item.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    return NextResponse.json({ item });
  } catch (error) {
    console.log('Error: ', error);
    return NextResponse.json(
      {
        message: 'Could not find this ITEM',
      },
      {
        status: 404,
      }
    );
  }
};

// Updating a specific ID
//TODO GET the body when "update" is pressed and read the values from the update pop-up
export const PUT = async (req, { params }) => {
  const { id } = params;

  const { name, quantity, description, category } = await req.json();

  try {
    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },
      data: {
        name,
        quantity,
        description,
        category,
      },
    });
    return NextResponse.json({ updatedItem });
  } catch (error) {
    console.log('Error: ', error);
    return NextResponse.json(
      {
        message: 'Cant find the item to update',
      },
      {
        status: 404,
      }
    );
  }
};

// Deleting a specific ID
export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.log('Error: ', error);
    return NextResponse(
      {
        message: 'Could not find ID',
      },
      {
        status: 404,
      }
    );
  }
};
