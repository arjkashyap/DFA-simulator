#ifndef SIMULATOR_H
#define SIMULATOR_H

#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class Simulator; }
QT_END_NAMESPACE

class Simulator : public QMainWindow
{
    Q_OBJECT

public:
    Simulator(QWidget *parent = nullptr);
    ~Simulator();

private:
    Ui::Simulator *ui;
};
#endif // SIMULATOR_H
