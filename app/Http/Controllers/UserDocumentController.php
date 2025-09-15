<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserDocumentRequest;
use App\Models\UserDocument;
use Illuminate\Support\Facades\Auth;

class UserDocumentController extends Controller
{
    /**
     * Upload dokumen user
     */
    public function store(StoreUserDocumentRequest $request)
    {
        // Simpan file ke storage/app/public/uploads
        $path = $request->file('document_file')->store('uploads', 'public');

        // Simpan metadata ke database
        $doc = UserDocument::create([
            'user_id' => Auth::id(),
            'document_type' => $request->document_type,
            'document_number' => $request->document_number,
            'file_path' => $path,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Document uploaded successfully',
            'data' => $doc
        ]);
    }
}
