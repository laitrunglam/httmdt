import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../ui/table";
import axios from "axios";
import { useToast } from "../ui/use-toast";

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/customers");
      if (response.data.success) {
        setCustomers(response.data.customers);
      }
    } catch (error) {
      toast({
        title: "Failed to fetch customers",
        variant: "destructive",
      });
    }
  }

  async function handleDeleteCustomer(customerId) {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/customers/${customerId}`);
      if (response.data.success) {
        toast({
          title: "Customer deleted successfully",
        });
        setCustomers(customers.filter((customer) => customer._id !== customerId));
      }
    } catch (error) {
      toast({
        title: "Failed to delete customer",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCustomer(customer._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomerManagement;