import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import documents from "@/constants/documents.json";
const Documents = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {documents.map((item, i) => (
        <Document data={item} key={i} />
      ))}
    </div>
  );
};

const Document = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.date}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <Link href={"/dashboard/sign/" + data.id}>
          <Button className="w-fit">View</Button>
        </Link>
        <Badge className="opacity-70" variant={data.signed ? "secondary" : "destructive"}>
          {data.signed ? "Signed" : "Not Signed"}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default Documents;
