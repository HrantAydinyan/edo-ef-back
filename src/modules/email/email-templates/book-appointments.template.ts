import { BookAppointmentsDto } from 'src/modules/notification/dtos';

export function createBookAppointmentsTemplate(
  bookAppointmentsDto: BookAppointmentsDto,
): string {
  // TODO
  return `
    <div>
      <h1>Contact Us</h1>
      <p>Hello, ${bookAppointmentsDto.email}!</p>
    </div>
  `;
}
