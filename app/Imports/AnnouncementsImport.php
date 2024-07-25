<?php

namespace App\Imports;

use App\Models\Announcement;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AnnouncementsImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $imagePaths = $this->processImages($row['logo']);
    
            Announcement::create([
                'title' => $row['title'],
                'date_of_arrival' => $row['date_of_arrival'],
                'description' => $row['description'],
                'logo' => implode(',', $imagePaths),  
            ]);
        }
    }
    
    private function processImages($logos)
    {
        $imagePaths = [];
        $imageFiles = explode(',', $logos);
    
        foreach ($imageFiles as $imageFile) {
            $filePath = trim($imageFile);
    
            if (Storage::disk('public')->exists($filePath)) {
                $fileName = Str::random(20) . '.' . pathinfo($filePath, PATHINFO_EXTENSION);
                $destinationPath = 'images/' . $fileName;
    
                Storage::disk('public')->put($destinationPath, Storage::disk('public')->get($filePath));
    
                $imagePaths[] = 'storage/' . $destinationPath;
            }
        }
    
        return $imagePaths;
    }
    
}
