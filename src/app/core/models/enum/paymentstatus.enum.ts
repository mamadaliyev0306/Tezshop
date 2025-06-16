export enum PaymentStatus
{
    Pending,    // To'lov jarayonda
    Completed,  // Muvaffaqiyatli
    Failed,     // To'lov amalga oshmadi
    Refunded,   // Pul qaytarilgan
    PartiallyRefunded, // Qisman qaytarilgan
    Cancelled   // Bekor qilingan
}