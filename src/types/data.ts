export default interface FormData {
  id?: string; 
  lastname: string;
  firstname: string;
  middle_name?: string | undefined;
  suffix?: string | undefined;
  sex: string;
  age: string;
  barangay: string;
  unit: string;
  birthdate: string; 
  osca_id: string;
  remarks?: string | null;
  date_issued?: string | undefined; 
  date_applied?: string | undefined; 
}
