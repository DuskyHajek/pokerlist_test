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
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/50">
              <TableHead>Event</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {festivals.map((festival) => (
              <TableRow key={festival.clubid}>
                <TableCell className="font-medium align-middle">
                  <Link to={`/festival/${festival.clubid}`} className="flex items-center gap-2 text-pokerBlue hover:underline group">
                    {/* Small Circle Logo */}
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                      {festival.club_logourl && (
                        <img
                          src={festival.club_logourl.replace(/^http:/, 'https:')}
                          alt={`${festival.clubname} logo`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {/* Festival Name */}
                    <span className="group-hover:underline">{festival.clubname}</span>
                  </Link>
                </TableCell>
                <TableCell className="align-middle">{festival.club_city}</TableCell>
                <TableCell className="align-middle">{festival.club_event_duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OtherFestivalsTable; 