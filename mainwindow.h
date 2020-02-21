#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class DrawingArea; }
QT_END_NAMESPACE

class DrawingArea : public QMainWindow
{
    Q_OBJECT

public:
    DrawingArea(QWidget *parent = nullptr);
    ~DrawingArea();

private:
    Ui::DrawingArea *ui;
};
#endif // MAINWINDOW_H
