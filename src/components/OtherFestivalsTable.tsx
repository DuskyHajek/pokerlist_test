import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming Shadcn UI table components are here
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // For wrapping the table
import { slugify } from "@/lib/utils"; // Import slugify

// Reuse the Festival interface (consider defining it in a shared types file later)
interface Festival {
  clubid: string | number;
  clubname: string;
  club_city: string;
  club_event_duration: string;
  club_logourl: string; // Add logo URL
  // Add other relevant fields if needed
}

interface OtherFestivalsTableProps {
  festivals: Festival[];
}

const OtherFestivalsTable: React.FC<OtherFestivalsTableProps> = ({ festivals }) => {
  if (!festivals || festivals.length === 0) {
    return null; // Don't render anything if there are no other festivals
    // Or return a message: <p className="text-muted-foreground text-sm">No other festivals available.</p>
  }

  return (
    <Card className="border-4 border-white">
      <CardHeader>
        <CardTitle className="text-xl">Other Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          {/* Hide header on mobile, show on md and up */}
          <TableHeader className="hidden md:table-header-group">
            <TableRow className="bg-muted/40 hover:bg-muted/50">
              <TableHead>Event</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {festivals.map((festival) => (
              // Add padding and border for mobile view separation
              <TableRow key={festival.clubid} className="border-b last:border-b-0 md:border-b">
                {/* Event Cell (adjusts content for mobile) */}
                <TableCell className="font-medium align-top md:align-middle py-3 md:py-2">
                  {/* Logo and Name Link */}
                  <Link
                    to={`/festival/${festival.clubid}/${slugify(festival.clubname)}`}
                    className="flex items-center gap-2 text-pokerBlue hover:underline group mb-1 md:mb-0" // Add bottom margin for mobile spacing
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                      {festival.club_logourl && (
                        <img
                          src={festival.club_logourl.replace(/^http:/, 'https:')}
                          alt={`${festival.clubname} logo`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <span className="group-hover:underline">{festival.clubname}</span>
                  </Link>
                  {/* Mobile Only: City and Duration */}
                  <div className="block md:hidden text-sm text-muted-foreground ml-10 space-y-0.5">
                      {/* Using ml-10 to align with text, adjust if needed */}
                    <div>{festival.club_city}</div>
                    <div>{festival.club_event_duration}</div>
                  </div>
                </TableCell>
                {/* City Cell (hidden on mobile) */}
                <TableCell className="align-middle hidden md:table-cell">{festival.club_city}</TableCell>
                {/* Duration Cell (hidden on mobile) */}
                <TableCell className="align-middle hidden md:table-cell">{festival.club_event_duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OtherFestivalsTable; 