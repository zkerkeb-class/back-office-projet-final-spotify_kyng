"use client";

import DataTable from "@/components/ui/DataTable";
import { formatDuration, formatReleaseDate } from "@/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { Pencil, X } from "lucide-react";
import Link from "next/link";

const Albums = () => {
  const albumData = [
    {
      title: "Abbey Road",
      type: "album",
      artist: "The Beatles",
      releaseDate: "1969-09-26",
      genres: ["Rock"],
      tracks: [
        { title: "Come Together", duration: 259 },
        { title: "Something", duration: 182 },
      ],
      collaborators: ["George Martin"],
      artwork: "https://via.placeholder.com/150",
      duration: 2580,
    },
    {
      title: "Thriller",
      type: "album",
      artist: "Michael Jackson",
      releaseDate: "1982-11-30",
      genres: ["Pop", "Rock", "R&B"],
      tracks: [
        { title: "Thriller", duration: 357 },
        { title: "Beat It", duration: 258 },
      ],
      collaborators: ["Quincy Jones"],
      credits: ["Producer: Quincy Jones", "Engineer: Bruce Swedien"],
      artwork: "https://via.placeholder.com/150",
      duration: 4220,
    },
    {
      title: "Back in Black",
      type: "album",
      artist: "AC/DC",
      releaseDate: "1980-07-25",
      genres: ["Hard Rock"],
      tracks: [
        { title: "Hells Bells", duration: 312 },
        { title: "Back in Black", duration: 255 },
      ],
      collaborators: ["Mutt Lange"],
      
      artwork: "https://via.placeholder.com/150",
      duration: 2530,
    },
    {
      title: "The Dark Side of the Moon",
      type: "album",
      artist: "Pink Floyd",
      releaseDate: "1973-03-01",
      genres: ["Progressive Rock"],
      tracks: [
        { title: "Time", duration: 413 },
        { title: "Money", duration: 382 },
      ],
      collaborators: ["Alan Parsons"],

      artwork: "https://via.placeholder.com/150",
      duration: 2580,
    },
    {
      title: "Rumours",
      type: "album",
      artist: "Fleetwood Mac",
      releaseDate: "1977-02-04",
      genres: ["Rock"],
      tracks: [
        { title: "Go Your Own Way", duration: 217 },
        { title: "Dreams", duration: 257 },
      ],
      collaborators: ["Ken Caillat", "Richard Dashut"],
      artwork: "https://via.placeholder.com/150",
      duration: 2580,
    },
  ];

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("title", {
      header: "Titre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("artist", {
      header: "Artiste",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("releaseDate", {
      header: "Date de sortie",
      cell: (info) => formatReleaseDate(info.getValue()),
    }),
    columnHelper.accessor("genres", {
      header: "Genres",
      cell: (info) => info.getValue().join(", "),
    }),
    columnHelper.accessor("tracks", {
      header: "Pistes",
      cell: (info) => info.getValue().length,
    }),
    columnHelper.accessor("collaborators", {
      header: "Collaborateurs",
      cell: (info) => info.getValue().join(", "),
    }),
    columnHelper.accessor("artwork", {
      header: "Artwork",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Artwork"
          className="w-10 h-10 object-cover"
        />
      ),
    }),
    columnHelper.accessor("duration", {
      header: "Durée",
      cell: (info) => formatDuration(info.getValue())
    }),
    columnHelper.accessor("Actions", {
      cell: (info) => (
        <div className="flex gap-1">
          <button className="p-2 bg-green-500 text-white">
            <Pencil size={16} />
          </button>
          <button className="p-2 bg-red-500 text-white">
            <X size={16} />
          </button>
        </div>
      ),
    }),
  ];

  return (
    <>
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-6xl">Gestion des albums</h1>
      <Link href="/albums/create" className="bg-black text-white p-2 h-min rounded-md">
        Ajouter un album
      </Link>
    </div>
      <DataTable data={albumData} columns={columns} />
    </>
  );
};

export default Albums;
