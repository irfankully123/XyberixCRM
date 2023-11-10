<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendNotification extends Mailable
{
    use Queueable, SerializesModels;


    public $subject;
    public string $user_name;

    public function __construct($subject,string $user_name) {
        $this->subject = $subject;
        $this->user_name=$user_name;
    }

    public function build(): SendNotification
    {
        return $this->subject($this->subject)
            ->view('emails.send-notification',[
                'user_name'=>$this->user_name
            ]);
    }
}
