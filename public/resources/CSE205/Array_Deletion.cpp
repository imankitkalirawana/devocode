// Array Deletion 

#include <bits/stdc++.h>
using namespace std;

// Function to create and set the array
int setArr(int *Arr, int &n)
{
    int x;
    cout << "Enter the number of elements: ";
    cin >> x;

    // Cannot enter more elements than available size
    if (x >= n)
    {
        cout << "Not enough space" << endl;
        return -1;
    }
    // Take user input
    for (int i = 0; i < x; ++i)
    {
        cout << "Enter Element " << i + 1 << " : ";
        cin >> Arr[i];
    }
    // Return number of elements in array.
    return x;
}

int deleteElement(int *Arr, int &x, int &n)
{
    // Step1: Check if space is available
    if (x == 0)
    {
        cout << "Not enough element" << endl;
        return -1;
    }

    // Take input from user: element
    int element, ind;
    cout << "Enter the element to delete: ";
    cin >> element;

    for (int i = 0; i < x; ++i)
    {
        if (Arr[i] == element) {
            ind = i;
            break;
        }
    }
    

    // Step2: Shift all the elements to the right
    for (int i = ind; i < x-1; ++i)
    {
        Arr[i] = Arr[i+1];
    }

    // Step4: Update the number of elements in the arr
    --x;

    // Sucessful deletion
    return 1;
}

int deleteByIndex(int *Arr, int &x, int &n) {
    // Check if there is element in array to delete 
    if (x == 0 ) {
        cout << "Not enough element to delete" << endl;
        return -1;
    }

    // Take user input 
    int ind ;
    cout << "Enter index to delete: " ;
    cin >> ind; 

    // Check if input index in within range
    if (ind >= x) {
        cout << "Index out of range" << endl;
        return -1; 
    }

    // Shift the elements 
    for (int i = ind; i < x-1; ++i)
    {
        Arr[i] = Arr[i+1];
    }
    
    // Update the number of elements 
    --x;

    // Sucessful deletion 
    return 1;
}

void traverseArray(int *A, int &x, int &n)
{
    for (int i = 0; i < x; ++i)
    {
        cout << A[i] << " ";
    }
    cout << endl;
}

int main()
{
    int n;
    cout << "Enter size of array: ";
    cin >> n;

    int *Arr = new int[n];

    int x = setArr(Arr, n);
    traverseArray(Arr, x, n);
    if (deleteElement(Arr, x, n))
    {
        cout << "Deletion Sucessful" << endl;
        traverseArray(Arr, x, n);
    }
    else {
        cout << "Deletion Failed";
    }

    if (deleteByIndex(Arr, x, n))
    {
        cout << "Deletion Sucessful" << endl;
        traverseArray(Arr, x, n);
    }
    else {
        cout << "Deletion Failed";
    }

    return 0;
}
