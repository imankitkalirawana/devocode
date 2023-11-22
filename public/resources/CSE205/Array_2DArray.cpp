// Create A 2D Array using Pointers

#include <bits/stdc++.h>
using namespace std;

void setArr (int **Arr, int m, int n) {
    for (int i = 0; i < m; ++i)
    {
        for (int j = 0; j < n; ++j)
        {
            cout << "Enter element " << i << j << " : " ;
            cin >> Arr[i][j];
        }
    }
}

void traverseArr(int **Arr, int m, int n)
{
    for (int i = 0; i < m; ++i)
    {
        for (int j = 0; j < n; ++j)
        {
            cout << Arr[i][j] << " ";
        }
        cout << endl;
    }
}

int main()
{
    int m, n;
    cout << "Enter the number of rows: ";
    cin >> m;
    cout << "Enter the number of columns: ";
    cin >> n;

    int **Arr = new int *[m];

    for (int i = 0; i < m; ++i)
    {
        Arr[i] = new int[n];
    }

    setArr(Arr, m, n);
    traverseArr(Arr, m, n);

    return 0;
}