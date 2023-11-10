<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Inbox;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class InboxController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Inbox/InboxIndex', [
            'mails' => Inbox::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('id', 'like', '%' . $search . '%')
                        ->orWhere('fullname', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%')
                        ->orWhere('company', 'like', '%' . $search . '%')
                        ->orWhere('phone', 'like', '%' . $search . '%')
                        ->orWhere('interest', 'like', '%' . $search . '%')
                        ->orWhere('budget', 'like', '%' . $search . '%');
                })
                ->orderBy('id', 'desc')
                ->paginate(8)
                ->withQueryString()
        ]);
    }


    public function showCompose(): Response
    {
        return Inertia::render('Inbox/InboxCompose');
    }

    public function send(Request $request): void
    {
        $request->validate([
            'subject' => ['string', 'max:255'],
            'email' => ['required', 'string', 'email:rfc,dns'],
            'message' => ['required'],
        ]);

        $email = $request->input('email');
        $messageContent = $request->input('message');

        Mail::raw($messageContent, function ($message) use ($email, $request) {
            $message->to($email);
            $message->subject($request->input('subject'));
        });

    }


    public function reply(Request $request,Inbox $inbox): void
    {
        $request->validate([
            'subject' => ['string', 'max:255'],
            'message' => ['required']
        ]);

        $email = $inbox->email;
        $messageContent = $request->input('message');

        Mail::raw($messageContent, function ($message) use ($email, $request) {
            $message->to($email);
            $message->subject($request->input('subject'));
        });

    }

    public function show(Inbox $mail): Response
    {
        return Inertia::render('Inbox/InboxDetail', [
            'mail' => $mail
        ]);
    }

    public function destroy(Inbox $mail): void
    {
        $mail->delete();
    }
}
