export class AppointmentRegisterDto {
  readonly user: string;
  readonly doctor: string;
}

export class AppointmentDeclineDto {
  readonly appointment: string;
  readonly doctor: string;
}
