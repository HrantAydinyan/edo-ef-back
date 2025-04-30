import { ContactUsDto } from 'src/modules/notification/dtos';

export function createContactUsTemplate(
  contactUsDetails: ContactUsDto,
): string {
  // TODO
  return `
    <div>
      <h1>Contact Us</h1>
      <p>Hello, ${contactUsDetails.name}!</p>
      <p>Your message: ${contactUsDetails.message}</p>
      <p>Contact with email: ${contactUsDetails.email}</p>
    </div>
  `;
}
